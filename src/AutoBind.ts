export default abstract class ClassUtil {
    /**
     * There is a react-autobind module that some of our other projects use.
     * I had previously installed this module and was looking at the source on github to make
     * typescript definitions for it, and it's pretty bad. So this is a mini refactor of it, since
     * it's really short anyways.
     *
     * Referenced from
     * https://github.com/cassiozen/React-autobind/blob/master/src/autoBind.js
     */
    static autoBind(context: any, ...props: string[]): void {
        const contextPrototype = Object.getPrototypeOf(context);

        if (props.length === 0) {
            props = Object.getOwnPropertyNames(contextPrototype);
        }

        for (const prop of props) {
            const descriptor = Object.getOwnPropertyDescriptor(contextPrototype, prop);

            // Missing this prop, not a big deal (or the prop isn't a function, so we don't bind it)
            if (descriptor == null || typeof descriptor.value !== 'function') {
                continue;
            }

            if (ClassUtil.protectedComponentProperties.includes(prop) || ClassUtil.protectedJavaScriptProperties.includes(prop)) {
                continue;
            }

            ClassUtil.bindMethod(contextPrototype, prop, descriptor);
        }
    }

    // All of the props on the prototype of an empty object should be excluded from binding
    private static protectedJavaScriptProperties: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf({}));

    private static protectedComponentProperties: string[] = [
        'render',
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount'
    ];

    /**
     * From autobind-decorator (https://github.com/andreypopp/autobind-decorator/tree/master)
     * Return a descriptor removing the value and returning a getter
     * The getter will return a .bind version of the function
     * and memoize the result against a symbol on the instance
     */
    private static bindMethod(proto: any, method: string, descriptor: PropertyDescriptor) {
        const functionToBind = descriptor.value;

        Object.defineProperty(proto, method, {
            configurable: true,
            get() {
                if (this === proto || this.hasOwnProperty(method)) {
                    return functionToBind;
                }

                const boundFunction = functionToBind.bind(this);

                Object.defineProperty(this, method, {
                    value: boundFunction,
                    configurable: true,
                    writable: true
                });

                return boundFunction;
            }
        });
    }
}