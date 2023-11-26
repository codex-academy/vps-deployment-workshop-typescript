export class UserCounter {
    private userCounters = new Map<string, number>();

    increment(username: string) {
        const counter = this.userCounters.get(username);

        if (counter) {
            this.userCounters.set(username, counter + 1);
        } else {
            this.userCounters.set(username, 1);
        }
    }

    decrement(username: string) {
        const counter = this.userCounters.get(username);
        if (counter) {
            if (counter >= 1) {
                this.userCounters.set(username, counter - 1);
            }
        }
    }

    counter(username: string) {
        return this.userCounters.get(username);
    }
}
