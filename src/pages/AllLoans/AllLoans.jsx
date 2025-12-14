import Container from '../../components/shared/Container/Container';
import LoanCard from '../../components/shared/LoanCard/LoanCard';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import useAxios from '../../hooks/useAxios';

const AllLoans = () => {
    const axiosPublic = useAxios();
    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/loans');
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <Container>
            <div className="py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-primary">Explore Our Loans</h1>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Find the perfect financial solution for your needs. Browse through our wide range of loan products designed to help you achieve your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loans.map(loan => (
                        <LoanCard key={loan._id} loan={loan} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default AllLoans;
