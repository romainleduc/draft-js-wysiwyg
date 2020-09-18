
export class KeyPress {
    commandsAvailable = [
        'bold',
        'code',
        'italic',
        'strikethrough',
        'underline',
    ];
    commandsSaved = [];


    test(command) {
        if (this.commandsAvailable.includes(command)) {
            if (this.commandsSaved.includes(command)) {
                this.commandsSaved()
            } else {
                this.commandsSaved = [...this.commandsSaved]
            }
        }
    }

    addCommand(command) {
        if (this.commandsAvailable.includes(command)) {
            this.commandsSaved = [
                ...this.commandsSaved,
                command
            ];
        }
    }

    removeCommand(command) {
        this.commandsSaved = this.commandsSaved.filter(
            commandSaved =>
                commandSaved !== command
        );
    }

    getCommands() {
        return this.commandsSaved;
    }

    getCommands() {
        return this.commandsSaved;
    }
}
