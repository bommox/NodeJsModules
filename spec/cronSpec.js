describe("Cron Spec", function() {

    const cron = require('../cron');
    var cronEverySecond = cron("* * * * * *");
    var cronEveryTwoSecond = cron("*/2 * * * * *");
    var cronEvery100m = cron(100);

    // it("cron works", function(done) {
    //     var count = 0;
    //     var cron1 = cronEverySecond(() => {count++});
    //     cron1.start();
    //     setTimeout(() => {
    //         cron1.stop();
    //         expect(count).toBe(4);
    //         done();
    //     },4500);
    // });

    it("cron 2 seconds", function(done) {
        var count = 0;
        var cron1 = cronEveryTwoSecond(() => {count++});
        cron1.start();
        setTimeout(() => {
            cron1.stop();
            expect(count).toBe(1);
            done();
        },2500);
    });

    it("Simple interval", function(done) {
        var count = 0;
        var cron = cronEvery100m(() => {count++});
        cron.start();
        setTimeout(() => {
            cron.stop();
        },550);
        setTimeout(() => {
            expect(count).toBe(5);
            done();
        },750);

    });


});