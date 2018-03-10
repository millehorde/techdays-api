import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../../../common/enums/userType.enum';
import { getOrDefault } from '../../../common/miscellaneous/misc';

export interface IUser {
    user_id?: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    type?: UserType;
    token_boundary?: Date;
}

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    last_name: string;

    @Column({ type: 'int', nullable: false })
    type: UserType;

    @Column({ type: 'date', nullable: false })
    token_boundary: Date;

    constructor(copy: IUser = {}) {
        this.user_id = getOrDefault(copy.user_id, undefined as any);
        this.email = getOrDefault(copy.email, '');
        this.password = getOrDefault(copy.password, '');
        this.first_name = getOrDefault(copy.first_name, '');
        this.last_name = getOrDefault(copy.last_name, '');
        this.type = getOrDefault(copy.type, UserType.STUDENT);
        this.token_boundary = getOrDefault(copy.token_boundary, new Date());
    }
}
