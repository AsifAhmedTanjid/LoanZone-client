import { FaFileContract, FaUserCircle } from 'react-icons/fa'
import MenuItem from './MenuItem'

const BorrowerMenu = () => {
  return (
    <>
      <MenuItem icon={FaFileContract} label='My Loans' address='my-loans' />
      <MenuItem icon={FaUserCircle} label='Profile' address='profile' />
    </>
  )
}

export default BorrowerMenu
