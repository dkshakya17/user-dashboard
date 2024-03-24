'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import ProjectCard from '@/components/cards/project-card';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';

type FileStatsType = {
  className?: string;
};
interface projectData {
  project_id: number;
  description: string;
  name: string;
  status: string;
  skill_id: string;
  min_pph: number;
  max_pph: number;
  start_date: string;
  end_date: string;
  skillname: string;
  interested: Boolean;
}

export function ProjectsGrid({ className }: { className?: string }) {
  const [projectData, setProjectData] = useState<any>();
  const [skillData, setSkillData] = useState<any>({});
  const [interestedProjectData, setInterestedProjectData] = useState<any>();
  console.log(skillData, 'skillDataaaaaaa');

  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const fetchProjectsData = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/projects/list`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const projectDetails = (await response.json()) as any;
        console.log(projectDetails, 'projectDetails');
        setProjectData(projectDetails);
      }
    } catch (error) {}
  };
  const skillsData = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/skills/map`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const skillsMap = (await response.json()) as any;
        console.log(skillsMap.skills, 'skillsMap');
        setSkillData(skillsMap.skills);
      }
    } catch (error) {}
  };
  const interestedProject = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/projects/list/interested`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const interestedProjects = (await response.json()) as any;
        console.log(interestedProjects, 'interestedProjects');
        setInterestedProjectData(interestedProjects);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectsData();
    skillsData();
    interestedProject();
  }, []);

  // Key name to be changed
  const oldKeyName = 'name';

  // New key name
  const newKeyName = 'projectName';

  // Create a new array with the modified key name and old key removed
  let newArrayProject = projectData?.map((obj: any) => {
    // Destructure the object to exclude the old key
    const { [oldKeyName]: _, ...rest } = obj;

    // Create a new object with the modified key name and existing key-value pairs
    return {
      [newKeyName]: obj[oldKeyName],
      ...rest,
    };
  });

  console.log(newArrayProject, 'tested');

  // Iterate over the array and add key-value pairs from the map
  let ProjectDatawithSkill = newArrayProject?.map((obj: any) => {
    // Clone the original object to avoid modifying it directly
    let newObj = { ...obj };

    // Retrieve the corresponding object from the map
    let additionalValues = skillData[obj.skill_id];
    // Add key-value pairs from the map to the new object
    Object.assign(newObj, additionalValues);

    return newObj;
  });

  console.log(ProjectDatawithSkill, 'newarryaaaaa');

  const finalProjectData = ProjectDatawithSkill?.map((item: projectData) => {
    const matchingProject = interestedProjectData?.find(
      (project: any) => project.project_id === item.project_id
    );

    if (matchingProject) {
      // If there's a matching project, add a new key-value pair to the item
      return {
        ...item,
        interested: true,
      };
    }

    // If no matching project is found, return the item as is
    return item;
  });

  console.log(finalProjectData, 'finalProjectData');

  return (
    <>
      {finalProjectData?.map((stat: any) => {
        return (
          <ProjectCard
            skillId={stat.skill_id}
            key={stat.project_id}
            minPay={stat.min_pph}
            maxPay={stat.max_pph}
            skills={stat.name}
            projectId={stat.project_id}
            projectName={stat.projectName}
            contentClassName="w-full"
            interested={stat.interested}
            className={cn('w-full max-w-full justify-between', className)}
          />
        );
      })}
    </>
  );
}

export default function Projects({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute left-0 top-0 z-10 !h-full w-8 !justify-start rounded-none bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8"
        >
          <ProjectsGrid className="min-w-[270px]" />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="!absolute right-0 top-0 z-10 !h-full w-8 !justify-end rounded-none bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
