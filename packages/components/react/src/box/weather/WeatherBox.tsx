import { forwardRef } from 'react';
import { CommonProps } from '../../common/types';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { Icon } from '../../common/icon/Icon';
import { LoadingSpinner } from '../../loading-spinner/LoadingSpinner';

interface WeatherBoxProps extends CommonProps {
  date: string;
  location: string;
  condition: React.ReactNode;
  iconSrc: string;
  temperature: number | string;
  highestTemperature: number | string;
  lowestTemperature: number | string;
  windSpeed: number | string;
}

/**
 * WeatherBox 컴포넌트
 *
 * @param {Date} [props.date=new Date()] - 날짜 (필수, 기본값: 현재 날짜)
 * @param {string} [props.location='-'] - 위치 (필수, 기본값: '-')
 * @param {React.ReactNode} [props.condition='loading'] - 날씨 상태 (필수, 기본값: 'loading')
 * @param {number | string} [props.temperature='-'] - 현재 온도 (필수, 기본값: '-')
 * @param {number | string} [props.highestTemperature='-'] - 최고 온도 (필수, 기본값: '-')
 * @param {number | string} [props.lowestTemperature='-'] - 최저 온도 (필수, 기본값: '-')
 * @param {string} [props.windSpeed='-'] - 미세먼지 상태 (필수, 기본값: '-')
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...CommonProps} props - Container 컴포넌트에 전달될 기타 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const WeatherBox = forwardRef<HTMLElement, WeatherBoxProps>(
  (
    {
      date = '2024-07-18 (목)',
      location = '-',
      condition = '-',
      iconSrc = '',
      temperature = '-',
      highestTemperature = '-',
      lowestTemperature = '-',
      windSpeed = '-',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Container
        display="flex"
        flexDirection="column"
        padding={16}
        gap={36}
        backgroundColor="backgroundNormalPrimary"
        borderRadius="ml"
        ref={ref}
        className={className}
        {...props}
      >
        {/* 날짜, 현재 위치 */}
        <Container display="flex" justifyContent="space-between">
          <Text textType="headline" color="textAlternative">
            {date}
          </Text>
          <Container display="flex" alignItems="center" gap={4}>
            <Icon size={15} color="textAssistive">
              location_on
            </Icon>
            <Text as="span" textType="body3" color="textAssistive">
              {location}
            </Text>
          </Container>
        </Container>
        {/* 현재 날씨 */}
        <Container display="flex" justifyContent="space-between" alignItems="center">
          {/* 날씨 상태, 온도 */}
          <Container display="flex" alignItems="center" gap={8}>
            <Container
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={72}
              height={72}
            >
              {/* {condition} */}
              <img src={iconSrc} />
            </Container>
            <Text textType="display1" textAlign="center">
              {`${temperature}°`}
            </Text>
          </Container>
          <Container display="flex" flexDirection="column" alignItems="flex-end" gap={8}>
            {/* 최고 최저 기온 */}
            <Container display="flex" gap={8}>
              <Container display="flex" gap={6}>
                <Text textType="body2" color="textAssistive">
                  최고
                </Text>
                <Text textType="body2" textMode="bold" color="textAlternative">
                  {highestTemperature}
                </Text>
              </Container>
              <Container display="flex" gap={6}>
                <Text textType="body2" color="textAssistive">
                  최저
                </Text>
                <Text textType="body2" textMode="bold" color="textAlternative">
                  {lowestTemperature}
                </Text>
              </Container>
            </Container>
            {/* 미세먼지 */}
            <Container display="flex" gap={6}>
              <Text textType="body2" color="textAssistive">
                풍속
              </Text>
              <Text textType="body2" textMode="bold" color="textAlternative">
                {windSpeed}m/s
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  },
);
