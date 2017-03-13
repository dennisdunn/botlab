

    static domToCartesian(point, offset) {
        return {
            x: point.x - offset.x,
            y: offset.y - point.y
        }

        

        let dom = Coord.eventToDom(e);
        let c = Coord.domToCartesian(dom, this.state.offset);
        let p = Coord.cartesianToPolar(c)
        let c2 = Coord.polarToCartesian(p)
        let dom2 = Coord.cartesianToDom(c2, this.state.offset)
console.log(dom)
console.log(c)
console.log(p)
console.log(c2)
console.log(dom2)


return