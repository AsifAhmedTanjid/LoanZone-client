import { FaFileContract, FaUserCircle } from 'react-icons/fa'
import MenuItem from './MenuItem'

const BorrowerMenu = () => {
  return (
    <>
      <MenuItem icon={FaFileContract} label='My Loans' address='my-loans' />
    </>
  )
}

export default BorrowerMenu
