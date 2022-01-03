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

    describe("buildPayload Unit Test", () => {
        test.each([
            ['fine name case1', {data: ['message'], level: {levelStr: "INFO"}, startTime: new Date("2022-01-03T06:06:39.373Z")},  {"fileName": "test logger", "message": "message", "severity": "INFO", "timestamp": new Date("2022-01-03T06:06:39.373Z")}],

        ])("input : %s, output: '%s')", (fileName, logEvent, expected) => {
            // given
            const logger = MyLogger.create(fileName)
    
            // when
            const actual = Object.getPrototypeOf(logger).buildPayload(fileName, logEvent)
            console.log(actual)
            
            // then
            expect(actual).toEqual(expected)
        })
    })
})