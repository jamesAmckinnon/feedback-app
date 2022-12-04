import React from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/client";
import { useState, useEffect } from 'react';
import { useGrowthAreas } from '@/lib/swr-hooks'
import { withRouter } from 'next/router';

function SelectAreasForGrowth( user_id ) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const growth_areas = useGrowthAreas(user_id.user_id);
  const [checked, setChecked] = useState(checkedArray);
  const [areas, setAreas] = useState(areas_for_growth);
  var checkedArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
  var areas_for_growth = [["Adaptability","adaptability",0], ["Attention to Detail","attention_to_detail",0], ["Business Acumen","business_acumen",0], ["Confidence","confidence",0], 
                          ["Conflict Resolution","conflict_resolution",0], ["Decision Making","decision_making",0], ["Dependability","dependability",0], ["Domain Knowledge","domain_knowledge",0], 
                          ["Emotional Intelligence","emotional_intelligence",0], ["Extreme Ownership","extreme_ownership",0], ["Growth Mindset","growth_mindset",0], ["Leadership","leadership",0], 
                          ["Listening","listening",0], ["Multitasking","multitasking",0], ["Open Mindedness","open_mindedness",0], ["Organization","organization",0], ["Problem Solving","problem_solving",0], 
                          ["Radical Candor","radical_candor",0], ["Self-care","self_care",0], ["Self-motivation","self_motivation",0], ["Teamwork","teamwork",0], ["Time Management","time_management",0], 
                          ["User Obsession","user_obsession",0], ["Verbal Communication","verbal_communication",0], ["Work Ethic","work_ethic",0], ["Working Under Pressure","working_under_pressure",0], 
                          ["Written Communication","written_communication",0]];

  useEffect(() => {   
    setChecked(checkedArray);
    setAreas(areas_for_growth);
  }, []);


  if(!growth_areas.isLoading && Object.keys(growth_areas.growth_areas[0]).length != 0){

    if( JSON.stringify(checked) == JSON.stringify([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])){
      for(let i = 0 ; i < Object.keys(growth_areas.growth_areas[0]).length; i++){
        areas_for_growth[i][2] = growth_areas.growth_areas[0][Object.keys(growth_areas.growth_areas[0])[i]];
        checkedArray[i] = growth_areas.growth_areas[0][Object.keys(growth_areas.growth_areas[0])[i]];
      }
      setChecked(checkedArray);
    }
    
  
    return (
      <div className="w-full pt-24">
          <div className="flex flex-col">
              <h3 className="text-3xl text-customGrey2 font-bold">Areas For Growth</h3>
              {areas.map((a, index) => (
                <div>
                  <div className="w-full pt-2 flex flex-row justify-start items-center">
                    <input
                      id="first_name" 
                      type="checkbox" 
                      className="border-b border-black pl-2"  
                      name="ju"
                      checked = {checked[index] == 1 ? true : false}
                      onChange={ (e) => {setCheckedArray(index, checked[index] == 1 ? 0 : 1)}}
                    >
                    </input>
                    <h3 className="pl-2">{a[0]}</h3>
                  </div>
                </div>

              ))}
          </div>
      </div>
    )
  } else {
    return (
      <>
      </>
    )
  }

  function setCheckedArray (index, binary){
    areas_for_growth[index][2] = binary;
    checked[index] = binary;

    setChecked(checked);
    setAreas(areas_for_growth);

    //////////////// now update database below
  }

}

export default SelectAreasForGrowth