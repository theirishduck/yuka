/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { MessageDispatcher } from './MessageDispatcher.js';

class EntityManager {

	constructor() {

		this.entities = new Map();
		this.messageDispatcher = new MessageDispatcher( this );

	}

	add( entity ) {

		this.entities.set( entity.id, entity );

		entity.addEventListener( 'message', this.onMessage, this );

		return this;

	}

	remove( entity ) {

		this.entities.delete( entity.id );

		entity.removeEventListener( 'message', this.onMessage );

		return this;

	}

	getEntityById( id ) {

		return this.entities.get( id );

	}

	getEntityByName( name ) {

		for ( let entity of this.entities.values() ) {

			if ( entity.name === name ) return entity;

		}

		return null;

	}

	update( delta ) {

		for ( let entity of this.entities.values() ) {

			entity.update( delta );

			entity.updateMatrix();

		}

		this.messageDispatcher.dispatchDelayedMessages( delta );

	}

	onMessage( event ) {

		const sender = event.target;
		const name = event.name;
		const message = event.message;
		const delay = event.delay;
		const data = event.data;

		const receiver = this.getEntityByName( name );

		if ( receiver !== null ) {

			this.messageDispatcher.dispatch( sender, receiver, message, delay, data );

		} else {

			console.warn( 'YUKA.EntityManager: Unable to send message to receiver. Could not find game entity for name:', name );

		}

	}

}

export { EntityManager };
