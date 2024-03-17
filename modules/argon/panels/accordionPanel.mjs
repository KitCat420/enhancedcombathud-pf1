export function accordionPanel(ARGON) {
    return class Pathfinder1eAccordionPanel extends ARGON.MAIN.BUTTON_PANELS.ACCORDION.AccordionPanel {
        get actionType() {
            return this.parent?.actionType;
        }

        async toggleDefaults() {
            this._subPanels[0].toggle(true)
        }

        hideAll() {
            this._subPanels.forEach(panel => {
                if(panel.element.classList.contains("show")) panel.toggle(false)
            });
        }
    }
}

export function accordionPanelCategory(ARGON) {
    return class Pathfinder1eAccordionPanelCategory extends ARGON.MAIN.BUTTON_PANELS.ACCORDION.AccordionPanelCategory {

        toggle(toggle, noTransition = false) {
            const hide = this.element.classList.contains("show");
            if (!hide) {
                this.parent.hideAll();
            }

            super.toggle(toggle, noTransition);
        }
    }
}