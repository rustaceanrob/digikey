import Language from "../lang";

export const acknowledgement = "Your data is encrypted and protected to ensure only you have access to your secrets. However, this means if your device is lost, stolen or broken, you cannot recover your secrets."

export default <Language> {
    nameLabel: "Label",
    yourSecrets: "Your Secrets",
    secretLabel: "Secret",
    important: "Important",
    ack: acknowledgement,
    save: "Save",
    back: "Back",
    delete: "Delete",
    copiedTo: "Copied to clipboard",
    secTip: "Labels and secrets are limited to 50 characters",
    maxSecs: "A maximum of 100 secrets are allowed",
    error: "An error occured",
    isBlankSec: "Label or secret is blank",
    confirm: "Confirm",
    confirmDelete: "Are you sure you want to delete this secret? You cannot undo this action.",
    addASec: "Add a secret"
}
