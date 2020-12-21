import { PrimaryColumn } from "typeorm";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @Column({ nullable: true })
    access_token: string

    @Column({ nullable: true })
    refresh_token: string

    @PrimaryColumn()
    id: string

    @Column()
    display_name: string

    @Column()
    uri: string

    @Column()
    href: string



    @Column({ nullable: true })
    active?: boolean

    @Column({ nullable: true })
    savedVolume?: number

    @Column({ nullable: true })
    isAdvertisement?: boolean



    public getAuth() {
        return {
            access_token: this.access_token
        }
    }

}
