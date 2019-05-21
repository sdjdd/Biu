import Track from '../src/Track'
import chai from 'chai'

let expect = chai.expect

Track.prototype.toArray = function() {
    let arr = []
    for (let cur = this._head; cur !== null; cur = cur.next) {
        arr.push(cur.height)
    }
    return arr
}

describe('Track', function () {
    it('initialize', function() {
        expect(new Track(100).toArray()).deep.eq([100])
    })

    it('#clear()', function() {
        let track = new Track(100)
        track.insert(10, 0, 100, 10)
        track.clear()
        expect(track.toArray()).deep.eq([100])
    })

    describe('#insert()', function() {
        it('同时插入多条弹幕', function() {
            let track = new Track(100)
            expect(track.insert(10, 0, 100, 10)).eq(0)
            expect(track.insert(20, 0, 100, 10)).eq(10)
            expect(track.insert(30, 0, 100, 10)).eq(30)
            expect(track.toArray()).deep.eq([10, 20, 30, 40])
        })

        it('覆盖单条轨道', function() {
            let track = new Track(100)
            track.insert(10, 0, 100, 10)
            expect(track.insert(10, 10, 110, 10)).eq(0)
            expect(track.toArray()).deep.eq([10, 90])
        })

        it('覆盖多条轨道', function() {
            let track = new Track(100)
            track.insert(10, 0, 100, 10)
            track.insert(10, 0, 100, 10)
            track.insert(10, 0, 100, 10)
            expect(track.insert(30, 10, 110, 10)).eq(0)
            expect(track.toArray()).deep.eq([30, 70])
        })

        it('分割单条轨道', function() {
            let track = new Track(100)
            track.insert(20, 0, 100, 10)
            expect(track.insert(10, 10, 110, 10)).eq(0)
            expect(track.toArray()).deep.eq([10, 10, 80])
        })

        it('覆盖并分割', function() {
            let track = new Track(100)
            track.insert(10, 0, 100, 10)
            track.insert(10, 0, 100, 10)
            track.insert(10, 0, 100, 10)
            expect(track.insert(25, 10, 110, 10)).eq(0)
            expect(track.toArray()).deep.eq([25, 5, 70])
        })

        it('超高弹幕', function() {
            let track = new Track(100)
            expect(track.insert(1000, 0, 100, 10)).eq(0)
            expect(track.toArray()).deep.eq([100])
        })

        // 在没有完美插入轨道的情况下, 选择最不影响视觉效果的轨道
        it('最优轨道', function() {
            let track = new Track(100)
            track.insert(50, 0, 100, 10)
            track.insert(50, 0, 100, 10)
            expect(track.insert(10, 0, 100, 10)).eq(0)
            expect(track.toArray()).deep.eq([10, 40, 50])

            track.clear()
            track.insert(50, 0, 100, 10)
            track.insert(50, 0, 100, 5)
            expect(track.insert(10, 0, 100, 10)).eq(50)
            expect(track.toArray()).deep.eq([50, 10, 40])

            track.clear()
            track.insert(50, 0, 100, 10)
            track.insert(50, 0, 100, 5)
            expect(track.insert(60, 0, 100, 10)).eq(0)
            expect(track.toArray()).deep.eq([60, 40])
        })
    })
})
