

import {Realm, createRealmContext} from '@realm/react';
import dayjs from 'dayjs'
export class Task extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    status!: Number;
    createdOn!: Date;
    modifiedOn!: Date;
    expiryOn!: Date;
    isActive:Boolean;
    type!: string;
    streaks!: Number;
    // the Task.generate() method creates Task objects with fields with default values
    static generate(name: string, status:number, expiryOn: Date, type: string, streak: number | null) {
      return {
        _id: new Realm.BSON.ObjectId(),
        name,
        status,
        createdOn: dayjs().add(330, 'minutes').toDate(),
        modifiedOn: dayjs().add(330, 'minutes').toDate(),
        expiryOn,
        isActive: true,
        type,
        streak: streak || 0
      };
    }
    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
      name: 'Task',
      primaryKey: '_id',
      properties: {
        _id: 'objectId',
        name: 'string',
        isActive: {type: 'bool', default: true},
        createdOn: 'date',
        modifiedOn:'date',
        expiryOn: 'date',
        type: 'string',
        streak: 'int',
        status: 'int',
      },
      
    };
  }
  const config = {
    schema: [Task],
    schemaVersion: 3,
  };

  export default createRealmContext(config);