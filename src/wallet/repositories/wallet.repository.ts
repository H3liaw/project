import { BusinessRepository } from 'src/base/business.repository';
import { EntityRepository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';


@EntityRepository(Wallet)
export class  WalletRepository extends BusinessRepository<Wallet> {

    async findUserById(id: number) {
        return this.createQueryBuilder('wallet')
          .andWhere('wallet.userID =:id', { id: id })
          .getOne ();
    }
    
    
    // async findWalletById()
}
