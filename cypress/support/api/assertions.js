class Assertions {
    shouldHaveStatus(response, status) {
        expect(response.status, `status in ${status}`).to.eq(status);
    }

    validateContractOf(response, schema) {
        return cy.wrap(response.body).should(
            schema
        )
    }

    shouldBookingIdBePresent(response) {
        expect(response.body.getBookingid, 'bookingid exists').to.not.be.null;
    }

    shouldHeaveDefaultHeaders(response){
        expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveConytentTypeAppJson(response){
        expect(response.headers, 'content type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDurationBeFast(response){
        expect(response.duration, 'response duration').lessThan(900);
    }

}

export default new Assertions();