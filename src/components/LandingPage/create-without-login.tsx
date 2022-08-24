import React from 'react'
import LandingPageLayout from '../layouts/landing-page-layout'
import CreateTaskCard from '../create-task/createTask-card'

const CreateWihtoutLogin = () => {
  return (
    <LandingPageLayout>
        <CreateTaskCard/>
    </LandingPageLayout>
  )
}

export default CreateWihtoutLogin