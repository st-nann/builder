import _ from 'lodash'
export class BuilderTagMap {
    private static table: any = {
        text: "TextPage",
        spacer: "SpacerPage",
        image: "ImagePage",
        button: "ButtonPage",
        box: "BoxPage",
        input: "InputPage",
        textarea: "TextareaPage",
        select: "SelectPage",
        checkbox: "CheckboxPage",
        radio: "RadioPage",
        container: "div"
    }
    static getTag(elementName: string): string | undefined {
        const key = _.toLower(elementName)
        return this.table[key]
    }
}