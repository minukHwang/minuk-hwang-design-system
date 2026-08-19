# @minuk-hwang-design-system/components-react

## 1.2.0

### Minor Changes

- 7a38c56: `Field.Control` accepts an element as well as a render function

  A function cannot cross the React Server Components boundary — React refuses it
  with "Functions cannot be passed directly to Client Components" — so the render
  prop left `Field` as the one component in the package that could not be rendered
  from a server component at all. The README said the opposite: that a namespace
  import works on either side of the boundary. It does; `Field.Control` was what
  stopped there.

  Passing a single element clones the generated props onto it, so this works from
  a server component:

  ```tsx
  <Field.Control>
    <Input placeholder="@scope/name" />
  </Field.Control>
  ```

  The render prop is unchanged and stays the form the documentation shows. It is
  the only thing that works for a control the system has never seen, since cloning
  guesses at the child's API. The element's own props win the merge, so a caller
  who writes `disabled` or an `id` keeps it.
