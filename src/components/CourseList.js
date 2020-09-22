import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import Course from '../components/Course'

const SPACE_ID = 'f09ae8ztch44'
const ACCESS_TOKEN = 'iQuTXSFdTDw0yh48qxYSVqtgPg-doilTkSnQaEMnUE8'
// const ACCESS_TOKEN = 'Fkq-w1dk6ao6YgHLiSdyzoAJW8Jy-1yZL97L-zvu6mY'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN 
})

class CourseList extends Component{
    state = {
        courses: [],
        searchString: ''
    }
    constructor() {
        super();
        this.getCourses();
    }
    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString        
        })
        .then((response)=> {
            this.setState({courses: response.items})
            console.log(this.state.courses)
        })
        .catch((error)=>{
            console.log("Error occurred while fetching Entries");
            console.error(error)
        })
    }
    
    onSearchInputChange = (event) =>{
        console.log("Search changed .."+ event.target.value)
        if(event.target.value){
            this.setState({searchString: event.target.value});
        }else{
            this.setState({searchString: ''});
        }
        this.getCourses();
    }

    render() {
        return (
         <div>
             { this.state.courses ? (
                <div>
                    <TextField style={{padding:24}}
                        id="searchInput"
                        placeholder = "Search for courses"
                        margin = "normal"
                        onChange = {this.onSearchInputChange}
                    />
                    <Grid container spacing={24} style={{padding: 24}}>
                        {this.state.courses.map(currentCourse => 
                            <Grid item xs={12} sm={6} lg={4} xl ={3}>
                                {/* {console.log(Object.keys(currentCourse.fields.image))} */}
                                <Course course={currentCourse}></Course>
                            </Grid>
                        )}
                    </Grid>
                </div>
             ): "No courses Found"
             }
         </div>   
        );
    };    
    
}

export default CourseList;
