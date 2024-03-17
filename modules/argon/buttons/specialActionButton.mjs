import {ucFirst, useAction} from "../../util.mjs";
import {ModuleName} from "../../ech-pf1.mjs";

export function specialActionButton(ARGON) {
    return class Pathfinder1eSpecialActionButton extends ARGON.MAIN.BUTTONS.ActionButton {
        constructor({parent, type, color}) {
            super();
            this.type = type;
            this._parent = parent;
        }

        get actionType() {
            return this.parent.actionType;
        }

        get label() {
            if (this.replacementItem) {
                return this.replacementItem.name;
            }

            return game.i18n.localize(`ECHPF1.Actions.${ucFirst(this.type)}`);
        }

        get isValid() {
            return true;
        }

        get icon() {
            if (this.replacementItem?.img) {
                return this.replacementItem.img;
            }

            switch (this.type) {
                case "feint":
                    return `modules/${ModuleName}/icons/return-arrow.svg`;
                case "bullRush":
                    return `modules/${ModuleName}/icons/bull.svg`;
                case "dirtyTrick":
                    return `modules/${ModuleName}/icons/cloak-dagger.svg`;
                case "disarm":
                    return `modules/${ModuleName}/icons/drop-weapon.svg`;
                case "drag":
                    return `modules/${ModuleName}/icons/pull.svg`;
                case "overrun":
                    return `modules/${ModuleName}/icons/giant.svg`;
                case "steal":
                    return `modules/${ModuleName}/icons/snatch.svg`;
                case "grapple":
                    return `modules/${ModuleName}/icons/grab.svg`;
                case "reposition":
                    return `modules/${ModuleName}/icons/move.svg`;
                case "sunder":
                    return `modules/${ModuleName}/icons/hammer-break.svg`;
                case "trip":
                    return `modules/${ModuleName}/icons/falling.svg`;
                case "dropProne":
                    return `modules/${ModuleName}/icons/save-arrow.svg`;
                case "drawSheathe":
                    return `modules/${ModuleName}/icons/switch-weapon.svg`;
                case "standUp":
                    return `modules/${ModuleName}/icons/up-card.svg`;
                case "withdraw":
                    return `modules/${ModuleName}/icons/exit-door.svg`;
                case "coupDeGrace":
                    return `modules/${ModuleName}/icons/backstab.svg`;
                case "totalDefense":
                    return `modules/${ModuleName}/icons/shield.svg`;
                case "fightDefensively":
                    return `modules/${ModuleName}/icons/shield-bash.svg`;
                case "dropItem":
                case "dropWeapon":
                    return `modules/${ModuleName}/icons/drop-weapon.svg`;
                case "aidAnotherAttack":
                    return `modules/${ModuleName}/icons/sword-clash.svg`;
                case "aidAnotherDefense":
                    return `modules/${ModuleName}/icons/shield-bash.svg`;
            }
        }

        async _onLeftClick(event) {
            switch (this.type) {
                case "feint":
                    await this.actor.rollSkill("blf");
                    break;

                case "bullRush":
                case "dirtyTrick":
                case "disarm":
                case "drag":
                case "overrun":
                case "steal":
                case "grapple":
                case "reposition":
                case "sunder":
                case "trip":
                    await this.actor.rollCMB();
                    break;
            }

            useAction(this.actionType);
        }

        get colorScheme() {
            return this.parent.colorScheme;
        }

        async render(...args) {
            await super.render(...args);

            if (this.item?.flags[ModuleName]?.specialaction) {
                switch (this.colorScheme) {
                    case 1:
                        this.element.style.backgroundColor = "var(--ech-bonusAction-base-background)";
                        break;
                    case 2:
                        this.element.style.backgroundColor = "var(--ech-freeAction-base-background)";
                        break;
                    case 3:
                        this.element.style.backgroundColor = "var(--ech-reaction-base-background)";
                        break;
                    case 0:
                    default:
                        this.element.style.backgroundColor = "var(--ech-mainAction-base-background)";
                        break;
                }
            }
        }
    }
}