import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { useSignup } from './context/SignupContext';

const classifications = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student', 'Alumni'];
const schools = [
  'Kennesaw State University',
  'University of Georgia',
  'Georgia Tech',
  'Georgia State University',
  'Emory University',
  'Other',
];

export default function OnboardingScreen({ navigation }) {
  const { updateSignup } = useSignup();
  const [name, setName] = useState('');
  const [classification, setClassification] = useState('');
  const [school, setSchool] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const canContinue = name.length > 0 && classification && school;

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelect = (value) => {
    if (modalType === 'classification') setClassification(value);
    else setSchool(value);
    setModalVisible(false);
  };

  const modalOptions = modalType === 'classification' ? classifications : schools;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <View style={styles.headerSection}>
            <Text style={styles.title}>Tag You're It</Text>
            <Text style={styles.subtitle}>Let's get you started</Text>
          </View>

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
            <TouchableOpacity style={styles.dropdown} onPress={() => openModal('classification')}>
              <Text style={classification ? styles.dropdownSelected : styles.dropdownPlaceholder}>
                {classification || 'Select your classification'}
              </Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>School</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => openModal('school')}>
              <Text style={school ? styles.dropdownSelected : styles.dropdownPlaceholder}>
                {school || 'Select your school'}
              </Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={() => {
              if (canContinue) {
                updateSignup({ name, classification, school });
                navigation.navigate('OnboardingClasses');
              }
            }}
            disabled={!canContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Picker */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>
              {modalType === 'classification' ? 'Select Classification' : 'Select School'}
            </Text>
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const selected = modalType === 'classification' ? classification === item : school === item;
                return (
                  <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                    <Text style={[styles.modalItemText, selected && styles.modalItemActive]}>{item}</Text>
                    {selected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 60, gap: 24 },
  headerSection: { alignItems: 'center', marginBottom: 8, gap: 8 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { color: '#9CA3AF', fontSize: 16 },
  fieldContainer: { gap: 8 },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
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
  dropdownPlaceholder: { color: '#6B7280', fontSize: 16 },
  dropdownSelected: { color: '#FFFFFF', fontSize: 16 },
  chevron: { color: '#9CA3AF', fontSize: 12 },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#1E2A3A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '60%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemText: { color: '#D1D5DB', fontSize: 16 },
  modalItemActive: { color: '#3B82F6', fontWeight: '600' },
  checkmark: { color: '#3B82F6', fontSize: 16, fontWeight: 'bold' },
});