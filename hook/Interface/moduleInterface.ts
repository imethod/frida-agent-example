export interface moduleInterface {
    soName: string
    modle: Module
    hook(): void
    destroy(): void
}