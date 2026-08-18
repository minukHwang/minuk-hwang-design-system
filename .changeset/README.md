# Changesets

A release is described here before it happens, one file per change.

```bash
pnpm changeset          # write one: pick the packages, pick the bump, say why
pnpm version-packages   # spend them: bumps versions, writes CHANGELOG.md, deletes the files
pnpm release            # build and publish whatever changed
```

The point is that the version number stops being a decision made at release
time from memory. Each change says what it is when it is still fresh, and the
release is the sum of those.

`base-react` and `behavior-react` went unchanged through 1.1.0 and were not
republished. That stays true here without anyone having to remember it:
a package with no changeset gets no version.
