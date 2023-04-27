export interface Moduleinterface {
    soName: string
    modle: Module
    hook(): void
    destroy(): void
}