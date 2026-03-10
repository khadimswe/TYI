import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [name, setName] = useState('');
  const [classification, setClassification] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleContinue = () => {
    if (name && classification) {
      navigation.navigate('OnboardingEmail');
    }
  };

  const classifications = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
          <Text style={styles.title}>Tag You're It</Text>
          <Text style={styles.subtitle}>Let's get you started</Text>
        </View>

        <View style={styles.form}>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>What's your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#6B7280"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Classification</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={classification ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {classification || 'Select your classification'}
              </Text>
              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {classifications.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setClassification(option);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {name && classification ? (
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          ) : null}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  inner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  form: {
    width: '100%',
    gap: 24,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  dropdown: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: '#6B7280',
    fontSize: 16,
  },
  arrow: {
    color: '#9CA3AF',
    fontSize: 18,
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 4,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownItemText: {
    color: '#000000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});