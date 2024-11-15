import { Message } from '../bot';
import { Chat } from '../db-manager/classes';
import { Type, FunctionType, string, user, number } from '../typing';
import { ChatType, normalChat } from '../typing/chat_type';

// class Command<Input extends unknown[] = [], ChatType extends Chat = Chat> {
//     private _name: string;
//     private _args: Type[] = [];
//     private _chatType: Type<ChatType> = Chat as any;
//     private _callback: ((...args: Input) => void) | null = null;

//     constructor(name: string) {
//         this._name = name;
//         this._args = [];
//     }

//     get name() {
//         return this._name;
//     }

//     copy<I extends unknown[], C extends Chat>() {
//         const instance = new Command<I, C>(this._name);
//         instance._args = this._args;
//         instance._chatType = this._chatType as any;
//         instance._callback = this._callback as any;
//         return instance;
//     }

//     args<Args extends unknown[]>(...args: { [K in keyof Args]: Type<Args[K]> }) {
//         const instance = this.copy<Args, ChatType>();
//         instance._args = args;
//         return instance;
//     }

//     chatType<C extends Chat>() {
//         const instance = this.copy<Input, C>();
//         instance._chatType = Chat as any;
//         return instance;
//     }

//     implement(callback: (msg: Message<ChatType>, ...args: Input) => void) {
//         const instance = this.copy<Input, ChatType>();
//         instance._callback = callback as any;
//         return instance;
//     }
// }

// class Command<Input extends unknown[] = [], ChatType extends Chat = Chat> extends FunctionType<[Message<ChatType>, ...Input], void> {
//     private _name: string;
//     private _chatType: Type<ChatType> = Chat as any;

//     constructor(name: string) {
//         super();
//         this._name = name;
//     }

//     override copy<I extends unknown[], C extends Chat>() {
//         const instance = new Command<I, C>(this._name);
//         instance._chatType = this._chatType as any;
//         return instance;
//     }

//     chatType<C extends Chat>() {
//         const instance = this.copy<Input, C>();
//         instance._chatType = Chat as any;
//         return instance;
//     }

//     // override implement(callback: (msg: Message<ChatType>, ...args: Input) => void) {
//     //     const instance = this.copy<Input, ChatType>();
//     //     instance.executor = callback as any;
//     //     return instance;
//     // }

//     override implement(fn: (msg: Message<ChatType>, ...args: Input) => void): FunctionType<[Message<ChatType>, ...Input], void> {
        
//     }
// }

// class ChatType

type ArrayToUnion<T extends any[]> = T[number];
type MessageUnion<T extends ChatType<any>[]> = Message<ArrayToUnion<{ [K in keyof T]: T[K] extends ChatType<infer C> ? C : never }>>;

export class Command<ChatTypes extends ChatType<any>[] = [], Inputs extends unknown[] = []> {
    accessor parameterTypes: { [K in keyof Inputs]: Type<Inputs[K]> } = [] as any;
    accessor chatTypes: ChatTypes = [normalChat] as any;
    accessor executor: (msg: MessageUnion<ChatTypes>, ...args: Inputs) => void = (() => {}) as any;

    constructor(public name: string) {}

    copy<C extends Chat, I extends unknown[]>() {
        const instance = new Command<C, I>(this.name);
        instance.parameterTypes = this.parameterTypes as any;
        instance.chatTypes = this.chatTypes as any;
        instance.executor = this.executor as any;
        return instance;
    }

    args<Args extends unknown[]> (...args: { [K in keyof Args]: Type<Args[K]> }) {
        const instance = this.copy<C, Args>();
        instance.parameterTypes = args;
        return instance;
    }

    chatType<C extends Chat>(chatType: ChatType<C>) {
        const instance = this.copy<C, Inputs>();
        instance.chatTypes = chatType;
        return instance;
    }

    implement(fn: (msg: Message<C>, ...args: Inputs) => void) {
        const instance = this.copy<C, Inputs>();
        instance.executor = (...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
            const msg = args[0];
            if (!this.chatTypes.is(msg.chat)) {
                // @ts-ignore
                throw new TypeError(`Invalid chat type (expected ${this.chatTypes.constructor.name.slice(0, -4)}, got ${msg.chat.constructor.name})`);
            }

            this.parameterTypes.forEach((paramType, idx) => {
                const param = args[idx + 1] as any;
                if (!paramType.test(param))
                    throw new TypeError(`Invalid argument type at index ${idx} (expected ${paramType.constructor.name.slice(0, -4)}, got ${param.constructor.name})`);
            });

            fn(...args);
        };
        return instance;
    }

    execute(msg: Message<C>, ...args: Inputs) {
        return this.executor(msg, ...args);
    }
}

new Command('hello')
    .args(string, user, number)
    .chatType(normalChat)
    .implement((msg, a, b, c) => {
        msg.send(`Hello, ${b.name}!`);
    });