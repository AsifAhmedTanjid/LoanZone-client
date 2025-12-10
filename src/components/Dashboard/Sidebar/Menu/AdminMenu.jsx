import { FaUserCog, FaMoneyBillWave, FaFileInvoiceDollar } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaMoneyBillWave} label='All Loans' address='all-loan' />
      <MenuItem icon={FaFileInvoiceDollar} label='Loan Applications' address='loan-applications' />
    </>
  )
}

export default AdminMenu

