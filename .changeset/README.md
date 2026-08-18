# Changesets

A release is described here before it happens, one file per change.

```bash
pnpm changeset          # write one: pick the packages, pick the bump, say why
```

The point is that the version number stops being a decision made at release time
from memory. Each change says what it is when it is still fresh, and the release
is the sum of those.

`base-react` and `behavior-react` went unchanged through 1.1.0 and were not
republished. That stays true here without anyone having to remember it: a
package with no changeset gets no version, and a package that only depends on
one that moved gets the bump `updateInternalDependencies` asks for.

## Releasing

```bash
pnpm version-packages                    # spend the changesets: versions, CHANGELOG.md
git commit -am "chore: version packages" # the bump is a commit, so git can answer "when"
pnpm release                             # build, publish, and tag each package
```

`pnpm release` tags every package it publishes, `components-react@1.2.0` and so
on. Those say which package is at which version, which one tag for the whole
repository cannot.

Then one more tag for the release as a whole, because a GitHub Release needs
something to hang on and a reader looking for "what shipped in August" is not
looking for four package tags:

```bash
git tag -a v1.2.0 -m "components-react 1.2.0, style-tokens 1.0.2"
git push --follow-tags
gh release create v1.2.0 --title v1.2.0 --notes-file <(…)
```

The repository tag mirrors `components-react`, which is the package anyone
installs first. Keep the root `package.json` version on it too — nothing reads
that number, and letting it drift makes it a lie rather than a spare.

## Later

`changesets/action` does the middle of this: it watches `main` for pending
changesets, opens a "Version Packages" pull request with the bumps and
changelogs already written, and publishes when that is merged. Worth adding once
the manual run has been done at least once, so it is clear what the action is
standing in for.
