import GraphicsComponent from './graphics'

/**
 * Properties:
 * upper left corner: polar point
 * lower right corner: polar point
 * styles: object with canvas context properties
 * payload: object that will be passed to click handlers
 */
export default class Arc extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    addToPath() {
        let topL = this.props.service.polarToCanvaspolar(this.props.upperLeft)
        let botttomR = this.props.service.polarToCanvaspolar(this.props.lowerRight)
        this.props.path.arc(this.props.service.offset.x,
            this.props.service.offset.y,
            topL.radius,
            topL.theta,
            botttomR.theta,
            false)
        this.props.path.arc(this.props.service.offset.x,
            this.props.service.offset.y,
            botttomR.radius,
            botttomR.theta,
            topL.theta,
            true)
        let endpoint = this.props.service.polarToCartesian(this.props.upperLeft)
        endpoint = this.props.service.cartesianToCanvas(endpoint)
        this.props.path.lineTo(endpoint.x, endpoint.y)
    }
}