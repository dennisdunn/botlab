
import CoordinateTransforms from '../ui/lib/coordinateTransforms'
import { assert, should } from 'chai'
should()

const origin = { x: 100, y: 100 }
const radius = Math.sqrt(5000);
const data = {
    'cartesian': {
        I: { x: 50, y: 50 },
        II: { x: -50, y: 50 },
        III: { x: -50, y: -50 },
        IV: { x: 50, y: -50 }
    },
    'polar': {
        I: { r: radius, theta: 1 / 4 * Math.PI },
        II: { r: radius, theta: 3 / 4 * Math.PI },
        III: { r: radius, theta: 5 / 4 * Math.PI },
        IV: { r: radius, theta: 7 / 4 * Math.PI }
    },
    'canvas': {
        I: { x: 150, y: 50 },
        II: { x: 50, y: 50 },
        III: { x: 50, y: 150 },
        IV: { x: 150, y: 150 }
    },
    'canvasPolar': {
        I: { r: radius, theta: 7 / 4 * Math.PI },
        II: { r: radius, theta: 5 / 4 * Math.PI },
        III: { r: radius, theta: 3 / 4 * Math.PI },
        IV: { r: radius, theta: 1 / 4 * Math.PI }
    }
}

const sut = new CoordinateTransforms(origin)

describe('coordinate transform test of', () => {
    describe('cartesian to polar conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert quadrant ' + quadrant + ' coordinates to polar coordinates'
            it(msg, () => {
                let r = sut.cartesianToPolar(data.cartesian[quadrant])
                r.r.should.be.closeTo(data.polar[quadrant].r, 1e-4)
                r.theta.should.be.closeTo(data.polar[quadrant].theta, 1e-4)
            })
        })
    })

    describe('polar to cartesian conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert polar coordinates to quadrant ' + quadrant + ' coordinates'
            it(msg, () => {
                let r = sut.polarToCartesian(data.polar[quadrant])
                r.x.should.be.closeTo(data.cartesian[quadrant].x, 1e-4)
                r.y.should.be.closeTo(data.cartesian[quadrant].y, 1e-4)
            })
        })
    })

    describe('cartesian to canvas conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert quadrant ' + quadrant + ' coordinates to canvas coordinates'
            it(msg, () => {
                let r = sut.cartesianToCanvas(data.cartesian[quadrant])
                r.should.deep.equal(data.canvas[quadrant])
            })
        })
    })

    describe('canvas to cartesian conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert canvas coordinates to quadrant ' + quadrant + ' coordinates'
            it(msg, () => {
                let r = sut.canvasToCartesian(data.canvas[quadrant])
                r.should.deep.equal(data.cartesian[quadrant])
            })
        })
    })

    describe('polar to canvas-referenced polar conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert polar coordinates to canvas-referenced polar coordinates'
            it(msg, () => {
                let r = sut.polarToCanvaspolar(data.polar[quadrant])
                r.r.should.be.closeTo(data.canvasPolar[quadrant].r, 1e-4)
                r.theta.should.be.closeTo(data.canvasPolar[quadrant].theta, 1e-4)
            })
        })
    })

    describe('canvas-referenced polar to polar conversions', () => {
        ['I', 'II', 'III', 'IV'].forEach(quadrant => {
            let msg = 'should convert canvas-referenced polar coordinates to polar coordinates'
            it(msg, () => {
                let r = sut.polarToCanvaspolar(data.canvasPolar[quadrant])
                r.r.should.be.closeTo(data.polar[quadrant].r, 1e-4)
                r.theta.should.be.closeTo(data.polar[quadrant].theta, 1e-4)
            })
        })
    })
})