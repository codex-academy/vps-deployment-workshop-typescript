"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCounter = void 0;
class UserCounter {
    constructor() {
        this.userCounters = new Map();
    }
    increment(username) {
        const counter = this.userCounters.get(username);
        if (counter) {
            this.userCounters.set(username, counter + 1);
        }
        else {
            this.userCounters.set(username, 1);
        }
    }
    decrement(username) {
        const counter = this.userCounters.get(username);
        if (counter) {
            if (counter >= 1) {
                this.userCounters.set(username, counter - 1);
            }
        }
    }
    counter(username) {
        return this.userCounters.get(username);
    }
}
exports.UserCounter = UserCounter;
