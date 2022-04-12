import { BusinessEntity } from "src/base/bussiness.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallet extends BusinessEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    path:string;

    @Column({ nullable: true })
    userID: number;

    @Column({ nullable: true })
    address: string;

}
