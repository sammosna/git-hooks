export default [
    {
        input: "./index.js",
        output: [
            {
                file: "./dist/index.js",
                format: 'esm'
            },
            {
                file: "./dist/index.cjs",
                format: 'cjs'
            },
        ]
    },
    // {
    //     input: "./init.js",
    //     output: [
    //         {
    //             file: "./dist/init.js",
    //             format: 'esm'
    //         },
    //         {
    //             file: "./dist/init.cjs",
    //             format: 'cjs'
    //         },
    //     ]
    // },
]