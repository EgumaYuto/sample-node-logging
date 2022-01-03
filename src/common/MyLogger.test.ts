import { MyLogger } from "./MyLogger"
 
describe("MyLogger Unit Test", () => {
    describe("formatMessage Unit Test", () => {
        test.each([
            [[], ''],
            [['message'], 'message'],
            [['m1', 'm2'], 'm1, m2'],
            [['m1', {hoge: 'fuga'}], 'm1, {\"hoge\":\"fuga\"}']
        ])("input : %s, output: '%s')", (input, expected) => {
            // given
            const logger = MyLogger.create("test logger")
    
            // when
            const actual = Object.getPrototypeOf(logger).formatMessage(input)
            console.log(actual)
            
            // then
            expect(actual).toEqual(expected)
        })

        test("Include a stack trace in the message when formatting the error object.", () => {
            // given
            const logger = MyLogger.create("test logger")
            const error = new Error("sample error")
            const input = ["message", error]
    
            // when
            const actual = Object.getPrototypeOf(logger).formatMessage(input)
            console.log(actual)
            
            // then
            expect(actual).toContain("message")
            expect(actual).toContain(error.stack)
        })
    })
})