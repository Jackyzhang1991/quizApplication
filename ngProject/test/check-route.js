describe('Check whether the browser will redirect to result page after click submit quiz button', function () {
    it('QA: check the last 6 bits of letters of the redirect url', function () {
        browser.url("http://localhost:63342/Goldman%20Project/index.html");

        browser.click(".submit");
        browser.pause(3000);
        var test = browser.getUrl().slice(-6);

        expect(test).to.equal("result");
    });
});