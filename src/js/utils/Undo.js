var up = new Error("override me!");

class Command {
    constructor(name){
        this.name = name;
    }
    execute(){
        throw up;
    }
    undo(){
        throw up;
    }
    redo(){
        this.execute();
    }
}

class Stack {
    constructor(stackSize) {
        this.stackSize = stackSize || 0;
        this.commands = [];
        this.stackPosition = -1;
        this.savePosition = -1;
    }

    execute(command) {
        this._clearRedo();
        command.execute();
        this.commands.push(command);
        this.stackPosition++;

        if(this.stackSize > 0 && this.commands.length > this.stackSize) {
            this.commands.shift();
            this.stackPosition--;
        }
        this.changed();
    }

    undo(){
        this.commands[this.stackPosition].undo();
        this.stackPosition--;
        this.changed();
    }

    canUndo(){
        return this.stackPosition >= 0;
    }

    redo(){
        this.stackPosition++;
        this.commands[this.stackPosition].redo();
        this.changed();
    }

    canRedo(){
        return this.stackPosition < this.commands.length - 1;
    }

    save(){
        this.savePosition = this.stackPosition;
        this.changed();
    }

    dirty(){
        return this.stackPosition != this.savePosition;
    }

    _clearRedo(){
        this.commands = this.commands.slice(0, this.stackPosition + 1);
    }

    changed(){
        // do nothing, override
    }
}

module.exports = {
    Command:Command,
    Stack:Stack
};
