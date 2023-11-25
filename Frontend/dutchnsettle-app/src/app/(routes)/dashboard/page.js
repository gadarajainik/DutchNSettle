    "use client";
import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import classes from "./dashboard.module.scss"
import Tabs from "@/components/Tabs/Tabs"
import { ExpenseContext, FriendsContext, GroupsContext } from "@/app/lib/utility/context";
import AddExpenseDialog from "@/components/AddExpenseDialog/AddExpenseDialog";
import { useSession } from "next-auth/react";

const Dashboard = () => {
    const dashboardArray = [{ title: "total balance", dollar: "-$23.1" }, { title: "you owe", dollar: "-$23.54" }, { title: "you are owed", dollar: "$0.02" }]

    //Friends tab 
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [expense, setExpense] = useState({
        results: [], description: "", amount: "", members: [], loggedInMember: {}, openSplitScreen: false, selectedoption: {
            name: "", chipText: "", icon: ""
        }
    });

    const { data: session } = useSession();

    useEffect(() => {
        const loggedInMember = { ...session.user };
        loggedInMember["picture"] = session?.user?.image
        loggedInMember["_id"] = session?.user["userId"]
        expense.loggedInMember=loggedInMember
        expense.members.push(loggedInMember)
        const uniqueMembers = [...new Map(expense.members.map(item => [item._id, item])).values()]
        setExpense({ ...expense, members: uniqueMembers })
        console.log("hello", expense)
    }, [])

    const friendsValue = { friends, setFriends };
    const groupsValue = { groups, setGroups };
    const expenseValue = { expense, setExpense }

    const [openAddExpense, setOpenAddExpense] = React.useState(false);

    const clickOpenAddExpense = () => {
        setOpenAddExpense(true);
    };

    const closeAddExpense = () => {
        setOpenAddExpense(false);
    };

    return (
        <Container>
            <div>
                <Paper elevation={2} className={classes.center_paper}>
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item ><Typography variant="h5" >Dashboard</Typography></Grid>
                        <Grid item><Button className={classes.add_expense_button} onClick={clickOpenAddExpense}>Add an expense</Button><Button className={classes.settle_up_button}>Settle Up</Button></Grid>
                    </Grid>
                    <Divider sx={{ marginY: "10px" }} />
                    <Grid container direction="row"
                        justifyContent="space-evenly"
                    >
                        {dashboardArray.map((dashItem, index) => {
                            return (
                                <div key={dashItem.title}>
                                    <Grid item >
                                        <Box>
                                            <Typography variant="body1" >{dashItem.title}</Typography>
                                            <Typography variant="body1" >{dashItem.dollar}</Typography>
                                        </Box>
                                    </Grid>
                                    {index != dashboardArray.length - 1 && <Divider orientation="vertical" flexItem />}
                                </div>
                            )
                        })}
                    </Grid>
                    <Divider sx={{ marginY: "10px" }} />
                    <FriendsContext.Provider value={friendsValue} >
                        <GroupsContext.Provider value={groupsValue} >
                            <Tabs tabList={["Friends", "Groups"]} />
                        </GroupsContext.Provider >
                    </FriendsContext.Provider>
                    {openAddExpense &&
                        <ExpenseContext.Provider value={expenseValue}>
                            <AddExpenseDialog open={openAddExpense} handleClose={closeAddExpense} />
                        </ExpenseContext.Provider>}
                </Paper>
            </div>
        </Container>
    )
}

export default Dashboard