/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');

const runBuild = ({
    entryPoints = ['src/index.ts'], // 모두 동일하게 entryPoint 설정,
    pkg,
    config = {}, // 추가 설정
    onBuildEnd = () => { }, // 만약에 watch 실행 시 자동으로 실행되어야 하는 동작이 있다면 실행하는 함수
}) => {
    const dev = process.argv.includes('--dev'); // 명령줄 인자(arguments)를 확인
    const minify = !dev; // 만약 dev라면 minify 설정 해제

    const watch = process.argv.includes('--watch'); // watch 모드는 만약 변화가 있다면 알아서 다시 빌드하도록 하는 것

    const external = Object.keys({
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
    })

    /**
     * 빌드 설정
     */
    const baseConfig = {
        // 빌드할 파일 위치: 번들링할 엔트리 포인트 파일 경로를 지정
        entryPoints,
        // 번들링 설정: 모든 의존성 파일들을 하나의 파일로 번들링
        bundle: true,
        // 파일 압축: 코드를 간결하게 (minify) 작성하여 파일 크기를 줄임
        minify,
        // 소스맵 생성: 디버깅을 위해 소스맵 파일 생성
        sourcemap: true,
        // 파일 생성 위치: 컴파일된 파일이 저장될 디렉토리 경로
        outdir: 'dist',
        // 타겟 설정: ES2019 버전을 타겟으로 컴파일
        target: 'es2019',
        // 번들링 제외: 명시된 모듈들은 번들링에서 제외
        external,
        // 추가 설정
        ...config
    };

    /**
     * js(ESModule), cjs(commonJS) 파일 생성
     * -> 병렬 처리를 위해서 Promise.all
     */
    async function executeBuild() {
        // ESModule 설정
        const esmConfig = {
            ...baseConfig,
            format: 'esm',
        };

        // CommonJS 설정
        const cjsConfig = {
            ...baseConfig,
            format: 'cjs',
            outExtension: {
                ".js": ".cjs", // 확장자 변경 (겹치지 않게)
            },
        };

        if (watch) {
            // 만약 watch 한다면,
            // 플러그인 설정

            const plugins = [...(config.plugins || []), {
                name: 'watch-plugin',
                setup(build) {
                    build.onEnd(() => {
                        onBuildEnd();
                    });
                },
            }];

            // ESM 빌드에만 plugin 적용
            const ctxESM = await esbuild.context({ ...esmConfig, plugins });
            const ctxCJS = await esbuild.context(cjsConfig);

            await Promise.all([
                ctxESM.watch(),
                ctxCJS.watch(),
            ]);
            console.log('Watching for update');
        } else {
            // 아니라면 그냥 build
            await Promise.all([
                esbuild.build(esmConfig),
                esbuild.build(cjsConfig),
            ]);
        }
    }

    // build 및 에러 핸들링
    executeBuild().catch((error) => {
        console.error("Build failed with error:", error);
        process.exit(1);
    });
}

module.exports = runBuild;