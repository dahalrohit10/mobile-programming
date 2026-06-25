import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";

/* ---------------- FIREBASE ---------------- */
const FIREBASE_URL =
  "https://student-database-a134b-default-rtdb.firebaseio.com";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const jobs = [
    {
      id: 1,
      title: "React Native Developer",
      company: "Tech Nepal",
      salary: "Rs. 60,000",
      desc: "Full Time | Kathmandu | 2+ Years Experience",
      applyLink: "https://www.linkedin.com",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Studio",
      salary: "Rs. 45,000",
      desc: "Full Time | Lalitpur | Portfolio Required",
      applyLink: "https://www.linkedin.com",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Code Hub",
      salary: "Rs. 55,000",
      desc: "Remote | React JS | Full Time",
      applyLink: "https://www.linkedin.com",
    },
  ];

  /* ---------------- SAVE USER ---------------- */
  const saveUser = async () => {
    try {
      await fetch(FIREBASE_URL + "/users.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- SAVE JOB ---------------- */
  const saveJob = async (job) => {
    try {
      await fetch(FIREBASE_URL + "/savedJobs.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          job: job,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- LOGIN ---------------- */
  if (screen === "login") {
    return (
      <View style={styles.center}>
        <Text style={styles.bigTitle}>💼 Job Finder</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (
              email.trim() === "" ||
              password.trim() === ""
            ) {
              Alert.alert(
                "Error",
                "Please enter email and password"
              );
              return;
            }

            saveUser();
            setScreen("home");
          }}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("signup")}
        >
          <Text style={styles.link}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- SIGNUP ---------------- */
  if (screen === "signup") {
    return (
      <View style={styles.center}>
        <Text style={styles.bigTitle}>
          📝 Sign Up
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => setScreen("login")}
        >
          <Text style={styles.btnText}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- JOB DETAILS ---------------- */
  if (screen === "details" && selectedJob) {
    return (
      <View style={styles.container}>
        <Text style={styles.bigTitle}>
          {selectedJob.title}
        </Text>

        <Text style={styles.company}>
          {selectedJob.company}
        </Text>

        <Text style={styles.salary}>
          {selectedJob.salary}
        </Text>

        <Text style={styles.text}>
          {selectedJob.desc}
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSavedJobs([
              ...savedJobs,
              selectedJob,
            ]);
            saveJob(selectedJob);
          }}
        >
          <Text style={styles.btnText}>
            ❤️ Save Job
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnBlue}
          onPress={() =>
            Linking.openURL(
              selectedJob.applyLink
            )
          }
        >
          <Text style={styles.btnText}>
            Apply Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("home")}
        >
          <Text style={styles.link}>
            ⬅ Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- HOME ---------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        💼 Job Finder
      </Text>

      <Text style={styles.small}>
        Welcome, {email}
      </Text>

      <ScrollView>
        <Text style={styles.title}>
          Available Jobs
        </Text>

        {jobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.card}
            onPress={() => {
              setSelectedJob(job);
              setScreen("details");
            }}
          >
            <Text style={styles.jobTitle}>
              {job.title}
            </Text>

            <Text style={styles.company}>
              {job.company}
            </Text>

            <Text style={styles.salary}>
              {job.salary}
            </Text>

            <Text style={styles.small}>
              {job.desc}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.title}>
          ⭐ Saved Jobs
        </Text>

        {savedJobs.length === 0 ? (
          <Text style={styles.small}>
            No saved jobs yet
          </Text>
        ) : (
          savedJobs.map((job, index) => (
            <View
              key={index}
              style={styles.savedCard}
            >
              <Text style={styles.jobTitle}>
                {job.title}
              </Text>
              <Text>{job.company}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => setScreen("login")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f5f7fa",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  bigTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },

  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#2563EB",
    width: "90%",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnBlue: {
    backgroundColor: "#10B981",
    width: "90%",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },

  savedCard: {
    backgroundColor: "#E0F2FE",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },

  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  company: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },

  salary: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
    marginTop: 10,
  },

  small: {
    color: "#666",
    marginTop: 4,
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2563EB",
    fontSize: 16,
  },

  logout: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});