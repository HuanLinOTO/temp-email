# Temp-Email

## Install

```
yarn add @huanlin/temp-mail
```

## Use

```ts
export interface Email {
    address_from: string;
    eid: string;
    e_subject: string;
    e_date: number;
    name_to: string;
    name_from: string;
}
export declare function getTempEmail(maxRetries: number): Promise<string>;
export declare function waitForInbox(email: string): Promise<Email>;
export declare function getAllEmails(email: string): Promise<Email[]>;

```