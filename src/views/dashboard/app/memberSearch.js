import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberSearch = ({ searchText, setSearchText, setSearchResults }) => {
    const [requestsData, setRequestsData] = useState([]);
    const [filters, setFilters] = useState({
        company_name: '',
        member_category: '',
        chapter_name: '',
    });

    useEffect(() => {
        const searchMembers = async () => {
            try {
                if (searchText !== undefined && searchText.trim() !== '') {
                    const response = await axios.post(process.env.REACT_APP_API_URL +'/members/members/search', {
                        first_name: searchText,
                        ...filters,
                    });

                    if (response.status === 200) {
                        const filteredResults = response.data.requests.filter((request) => {
                            // Apply your filters here
                            const companyFilter = filters.company_name
                                ? request.company_name.toLowerCase().includes(filters.company_name.toLowerCase())
                                : true;
                            const categoryFilter = filters.member_category
                                ? request.member_category === filters.member_category
                                : true;
                            const chapterFilter = filters.chapter_name
                                ? request.chapter_name === filters.chapter_name
                                : true;

                            return companyFilter && categoryFilter && chapterFilter;
                        });

                        setRequestsData(filteredResults);
                    } else {
                        console.error('Failed to search members');
                    }
                } else {
                    // Handle the case when searchText is empty or undefined
                    // You can choose to show a message or clear the results, for example.
                    setRequestsData([]); // Clear the data
                }
            } catch (error) {
                console.error('Error searching members:', error);
            }
        };

        searchMembers();
    }, [searchText, filters]);

    // Update the search results in the parent component
    useEffect(() => {
        setSearchResults(requestsData);
    }, [requestsData, setSearchResults]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="member-search">
            <form className='pt-2'>
                <div className="row g-2">
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filter by Company Name"
                            name="company_name"
                            value={filters.company_name}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filter by Member Category"
                            name="member_category"
                            value={filters.member_category}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filter by Chapter Name"
                            name="chapter_name"
                            value={filters.chapter_name}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MemberSearch;