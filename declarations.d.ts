// NOTE: The declaration below was injected by `"framer"`
// see https://www.framer.com/docs/guides/handshake for more information.
declare module "https://framer.com/m/*";

declare const require: {
    context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): {
        keys(): string[];
        <T>(id: string): T;
    };
};