/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { MovingEntity } from '../core/MovingEntity.js';
import { SteeringManager } from './SteeringManager.js';
import { Vector3 } from '../math/Vector3.js';

const steeringForce = new Vector3();
const displacement = new Vector3();
const acceleration = new Vector3();
const target = new Vector3();

class Vehicle extends MovingEntity {

	constructor() {

		super();

		this.steering = new SteeringManager( this );

	}

	update( delta ) {

		// calculate steering force

		this.steering._calculate( delta, steeringForce );

		// acceleration = force / mass

		acceleration.copy( steeringForce ).divideScalar( this.mass );

		// update velocity

		this.velocity.add( acceleration.multiplyScalar( delta ) );

		// make sure vehicle does not exceed maximum speed

		if ( this.getSpeedSquared() > ( this.maxSpeed * this.maxSpeed ) ) {

			this.velocity.normalize();
			this.velocity.multiplyScalar( this.maxSpeed );

		}

		// calculate displacement

		displacement.copy( this.velocity ).multiplyScalar( delta );

		// calculate target position

		target.copy( this.position ).add( displacement );

		// update the orientation if the vehicle has a non zero velocity

		if ( this.getSpeedSquared() > 0.00000001 ) {

			this.lookAt( target );

		}

		// update position

		this.position.copy( target );

	}

}

export { Vehicle };
