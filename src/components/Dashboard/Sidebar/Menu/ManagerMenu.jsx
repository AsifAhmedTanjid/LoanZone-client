import { FaHandHoldingUsd, FaUserCircle, FaCheckCircle } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { BsBank } from 'react-icons/bs'
import MenuItem from './MenuItem'

const ManagerMenu = () => {
  return (
    <>
      <MenuItem icon={FaHandHoldingUsd} label='Add Loan' address='add-loan' />
      <MenuItem icon={BsBank} label='Manage Loans' address='manage-loans' />
      <MenuItem icon={MdPendingActions} label='Pending Applications' address='pending-loans' />
      <MenuItem icon={FaCheckCircle} label='Approved Applications' address='approved-loans' />
    </>
  )
}

export default ManagerMenu
