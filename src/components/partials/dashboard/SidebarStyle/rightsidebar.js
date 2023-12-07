import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({
        company_name: '',
        member_category: '', // Updated to use a select input
        chapter_name: '',
    });
    const [memberCategories, setMemberCategories] = useState([]); // Store member categories from the API
    const [chapterNames, setChapterNames] = useState([]);
    const [paddingTop, setPaddingTop] = useState('3vh'); // Default value

    const navigate = useNavigate();

    // Fetch member categories from the API when the component mounts
    useEffect(() => {
        async function fetchMemberCategories() {
            try {
                const response = await axios.get('process.env.REACT_APP_API_URL/memberCategory/memberCategory');
                if (response.status === 200) {
                    setMemberCategories(response.data); // Assuming the API response is an array of member categories
                } else {
                    console.error('Failed to fetch member categories');
                }
            } catch (error) {
                console.error('Error fetching member categories:', error);
            }
        }
        fetchMemberCategories();
    }, []);

    useEffect(() => {
        async function fetchChapterNames() {
            try {
                const response = await axios.get('process.env.REACT_APP_API_URL/chapters/chapters');
                if (response.status === 200) {
                    setChapterNames(response.data); // Assuming the API response is an array of chapter names
                    console.log('Chapter name', chapterNames);
                } else {
                    console.error('Failed to fetch chapter names');
                }
            } catch (error) {
                console.error('Error fetching chapter names:', error);
            }
        }
        fetchChapterNames();
    }, []);

     // Update the top padding based on screen size
     useEffect(() => {
        const handleResize = () => {
            // Set the top padding based on screen size
            const newPaddingTop = window.innerWidth < 768 ? '13vh' : '3vh';
            setPaddingTop(newPaddingTop);
        };

        // Initial call to set the padding based on the initial screen size
        handleResize();

        // Attach the event listener to update padding on window resize
        window.addEventListener('resize', handleResize);

        // Remove the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'searchText') {
            setSearchText(value);
        } else {
            setFilters({ ...filters, [name]: value });
        }
    };

    const handleSearch = async () => {
        try {
            // Combine search and filter criteria
            const searchRequest = {
                first_name: searchText,
                last_name: searchText,
                company_name: filters.company_name,
                member_category: filters.member_category,
                chapter_name: filters.chapter_name,
            };
    
            console.log('Search request:', searchRequest);
    
            const response = await axios.post('process.env.REACT_APP_API_URL/members/members/search', searchRequest);
    
            if (response.status === 200) {
                const searchResults = response.data.requests; // Assuming "requests" is the property containing the search results
                applyFilters(searchResults);
            } else {
                console.error('Failed to search members');
            }
        } catch (error) {
            console.error('Error searching members:', error);
        }
    };
    

    const applyFilters = (results) => {
        const filteredResults = results.filter((result) => {
            const { company_name, member_category, chapter_name } = filters;

            const isCompanyMatch =
                company_name === '' || (result.company_name && result.company_name.toLowerCase() === company_name.toLowerCase());
            const isMemberCategoryMatch = member_category === '' || result.member_category === member_category;
            const isChapterNameMatch = chapter_name === '' || result.chapter_name === chapter_name;

            return isCompanyMatch && isMemberCategoryMatch && isChapterNameMatch;
        });

        navigate('/dashboard/app/MembersList', { state: { searchResults: filteredResults } });
    };

    const minirightsidebar = () => {
        document.getElementById('rightSidebar').classList.toggle('right-sidebar');
        document.body.classList.toggle('right-sidebar-close');
    };

    return (
        <div className="right-sidebar-mini" id="rightSidebar">
            <div className="right-sidebar-panel p-0">
                <Card className="shadow-none">
                    <Card.Body style={{ paddingTop }}>
                        <div className="pt-3">
                            <div>
                                <div className="input-group pb-2">
                                    <input
                                        type="text"
                                        placeholder="Search Members by Name"
                                        name="searchText"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="row g-2">
                                    <div className="col-12">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Filter by Company Name"
                                                name="company_name"
                                                value={filters.company_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group">
                                            <select
                                                className="form-select"
                                                placeholder="Filter by Member Category"
                                                name="member_category"
                                                value={filters.member_category}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Category</option>
                                                {memberCategories.map((category) => (
                                                    <option key={category.member_category} value={category.member_category}>
                                                        {category.member_category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group">
                                            <select
                                                className="form-select"
                                                placeholder="Filter by Chapter Name"
                                                name="chapter_name"
                                                value={filters.chapter_name}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Chapter</option>
                                                {chapterNames.map((chapter) => (
                                                    <option key={chapter} value={chapter}>
                                                        {chapter.chapter_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 text-center pt-2'>
                                    <button className="btn btn-primary" onClick={handleSearch}>
                                        <b>Search and Apply Filters</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>

                    <div
                        className="right-sidebar-toggle bg-primary text-white mt-3 d-flex"
                        onClick={minirightsidebar}
                    >
                        <span className="material-symbols-outlined">chat</span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RightSidebar;









