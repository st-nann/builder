export class BuilderTagMap {
    private static table: any = {
        text: "TextPage",
        spacer: "SpacerPage",
        image: "ImagePage",
        button: "ButtonPage",
        box: "BoxPage"
    }
    static getTag(elementName: string): string | undefined {
        const key = elementName.toLowerCase()
        return this.table[key]
    }
}