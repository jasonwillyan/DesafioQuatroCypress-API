/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => {
        req.doAuth()
    })
    it('Validar o contrato do GET booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchemas())
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdBePresent(postBookingResponse)
            assertions.shouldHeaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveConytentTypeAppJson(postBookingResponse)
            assertions.shouldDurationBeFast(postBookingResponse)

        })
    });

    it('Tentar alterar uma reseva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Tentar alterar uma reseva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
            })
        })
    });

    it('Tentar alterar uma reseva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingTokenInvalid(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Tentar alterar uma reseva com id inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingIdInvalid(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
            })
        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })
    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingIdInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 405)
            })
        })
    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingIdInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 405)
            })
        })
    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingTokenInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });
});