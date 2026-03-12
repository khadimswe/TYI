import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';

const rewards = [
  { id: '1', title: '$5 Dining Dollars', description: 'Add $5 to your dining account', points: 500, icon: '🍽️', category: 'Dining' },
  { id: '2', title: '$10 Dining Dollars', description: 'Add $10 to your dining account', points: 900, icon: '🍽️', category: 'Dining' },
  { id: '3', title: '1 Meal Swipe', description: 'One meal swipe at any dining hall', points: 400, icon: '🍽️', category: 'Dining' },
  { id: '4', title: '3 Meal Swipes', description: 'Three meal swipes at any dining hall', points: 1100, icon: '🍽️', category: 'Dining' },
  { id: '5', title: '$10 Bookstore Credit', description: 'Use at campus bookstore', points: 950, icon: '📚', category: 'Bookstore' },
  { id: '6', title: '$20 Bookstore Credit', description: 'Use at campus bookstore', points: 1800, icon: '📚', category: 'Bookstore' },
  { id: '7', title: 'KSU Sweater', description: 'Official KSU branded sweater', points: 2500, icon: '👕', category: 'Items' },
  { id: '8', title: 'KSU Rain Jacket', description: 'Official KSU rain jacket', points: 3200, icon: '🧥', category: 'Items' },
];

const categories = ['All', 'Dining', 'Bookstore', 'Items'];

export default function CashOut() {
  const [points] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReward, setSelectedReward] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = selectedCategory === 'All' ? rewards : rewards.filter(r => r.category === selectedCategory);

  const handleRedeem = () => {
    setSelectedReward(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.title}>Cash Out</Text>
        <Text style={styles.subtitle}>Redeem your points for real campus rewards</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceIcon}>🏆</Text>
          <Text style={styles.balanceLabel}>Your Points</Text>
          <Text style={styles.balancePoints}>{points}</Text>
        </View>

        <Text style={styles.monthlyNotice}>✨ Items change every month</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {filtered.map(reward => {
            const canAfford = points >= reward.points;
            return (
              <TouchableOpacity
                key={reward.id}
                style={[styles.rewardCard, !canAfford && styles.rewardCardDisabled]}
                onPress={() => canAfford && setSelectedReward(reward)}
                disabled={!canAfford}
              >
                <Text style={styles.rewardIcon}>{reward.icon}</Text>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.description}</Text>
                <View style={styles.rewardPoints}>
                  <Text style={styles.rewardPointsIcon}>🏆</Text>
                  <Text style={[styles.rewardPointsText, !canAfford && { color: '#6B7280' }]}>{reward.points}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.hintCard}>
          <Text style={styles.hintText}>Need more points? Catch tags or answer questions on The Board!</Text>
        </View>

      </ScrollView>

      <Modal visible={selectedReward !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedReward && (
              <>
                <Text style={styles.modalIcon}>{selectedReward.icon}</Text>
                <Text style={styles.modalTitle}>{selectedReward.title}</Text>
                <Text style={styles.modalDesc}>{selectedReward.description}</Text>
                <View style={styles.modalInfoCard}>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Cost:</Text>
                    <Text style={[styles.modalValue, { color: '#F59E0B' }]}>{selectedReward.points} points</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Your balance:</Text>
                    <Text style={styles.modalValue}>{points} points</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>After redemption:</Text>
                    <Text style={[styles.modalValue, { color: '#3B82F6' }]}>{points - selectedReward.points} points</Text>
                  </View>
                </View>
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    {selectedReward.category === 'Items'
                      ? 'Pick up your item at the student center with your confirmation code'
                      : "You'll receive a confirmation code to use at the register"}
                  </Text>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedReward(null)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
                    <Text style={styles.redeemText}>Redeem Now</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {showSuccess && (
        <View style={styles.toast}>
          <Text style={styles.toastTitle}>✅ Redeemed Successfully!</Text>
          <Text style={styles.toastSub}>Check your email for the confirmation code</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 40, gap: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  balanceCard: { backgroundColor: '#1E2A3A', borderRadius: 16, padding: 24, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#3B82F630' },
  balanceIcon: { fontSize: 40 },
  balanceLabel: { color: '#9CA3AF', fontSize: 14 },
  balancePoints: { color: '#F59E0B', fontSize: 40, fontWeight: 'bold' },
  monthlyNotice: { color: '#9CA3AF', fontSize: 13, textAlign: 'center' },
  filterRow: { flexDirection: 'row' },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#374151', marginRight: 8 },
  filterChipActive: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  filterText: { color: '#9CA3AF', fontSize: 13 },
  filterTextActive: { color: '#000000', fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  rewardCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, width: '47%', gap: 6 },
  rewardCardDisabled: { opacity: 0.45 },
  rewardIcon: { fontSize: 32 },
  rewardTitle: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  rewardDesc: { color: '#9CA3AF', fontSize: 12 },
  rewardPoints: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  rewardPointsIcon: { fontSize: 14 },
  rewardPointsText: { color: '#F59E0B', fontWeight: 'bold', fontSize: 13 },
  hintCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  hintText: { color: '#9CA3AF', fontSize: 13, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#1E2A3A', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, gap: 12, alignItems: 'center' },
  modalIcon: { fontSize: 48 },
  modalTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  modalDesc: { color: '#9CA3AF', fontSize: 14, textAlign: 'center' },
  modalInfoCard: { backgroundColor: '#0A0F1E', borderRadius: 12, padding: 16, width: '100%', gap: 10 },
  modalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  modalLabel: { color: '#9CA3AF', fontSize: 14 },
  modalValue: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  noteBox: { backgroundColor: '#1D3557', borderRadius: 10, padding: 12, width: '100%' },
  noteText: { color: '#93C5FD', fontSize: 13, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelButton: { flex: 1, borderWidth: 1, borderColor: '#374151', borderRadius: 10, padding: 14, alignItems: 'center' },
  cancelText: { color: '#FFFFFF', fontSize: 15 },
  redeemButton: { flex: 1, backgroundColor: '#3B82F6', borderRadius: 10, padding: 14, alignItems: 'center' },
  redeemText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  toast: { position: 'absolute', bottom: 100, left: 24, right: 24, backgroundColor: '#22C55E', borderRadius: 12, padding: 16 },
  toastTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  toastSub: { color: '#FFFFFF', fontSize: 13 },
});