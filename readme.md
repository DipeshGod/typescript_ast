# Director API Docs

## Architectural decisions

- Each release of director should have defined logpoint supported versions.

```ts
//src/supported-versions.ts
export const LATEST = "7.9.0" as const;
export const BACKWARD1 = "7.8.0" as const;
export const BACKWARD2 = "7.7.0" as const;

export type SupportedVersion =
  | typeof BACKWARD2
  | typeof BACKWARD1
  | typeof LATEST;
```

- Each api endpoints should definition complete and backward compatible for last three versions of logpoint. Should Enable change in the single file for the changes in logpoint. For example, if we want to make changes in create-device-group we would make changes here:

<div style="background-color:rgb(16, 82, 223);padding:5px;color:white;margin-bottom:10;width:40%;font-size:15px">
File: src / configurations / device-groups / create-device-group / api.ts
</div>

- Unit tests for validating coherency accross multiple logpoints and e2e testing for integrated workflow.

<img src="https://miro.medium.com/v2/resize:fit:646/1*gMiUPuRGC36nxZHe2zthOg.png" alt="Alt text" width="400" height="300" /> <img src="https://logowik.com/content/uploads/images/vitest-testing-framework1721420841.logowik.com.webp" alt="Alt text" width="400" height="300" />

## Breakdown of api - How we impersonate multiple versions of logpoint from single api

## Small but not harmful problem with current approach and eliminating it
